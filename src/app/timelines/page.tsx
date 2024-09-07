import { MessageListComponent } from "../_components/templates/timelines/list/message-list";
import { MessagePostComponent } from "../_components/templates/timelines/post/message-post";

export default function Timelines() {
  return (
    <>
      <MessageListComponent />
      <MessagePostComponent />
    </>
  );
}
