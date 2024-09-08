import { captureException } from "@luna/lib/error";
import { storage } from "@luna/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/**
 * ファイルをアップロードし、そのダウンロードURLを返す関数
 * @param path - アップロード先のパス（例: "images/profile.jpg"）
 * @param file - アップロードするファイルオブジェクト (Blob, File)
 * @returns Promise<string> - アップロードされたファイルのダウンロードURL
 */
export const upload = async (
  path: string,
  file: Blob | File,
): Promise<string> => {
  try {
    // ストレージリファレンスを作成
    const storageRef = ref(storage, path);

    // ファイルをアップロード
    const snapshot = await uploadBytes(storageRef, file);

    // アップロードされたファイルのURLを取得
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    captureException("Failed to upload file", error);
    throw new Error("Failed to upload file");
  }
};
