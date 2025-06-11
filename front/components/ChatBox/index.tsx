import { useCallback, useEffect, useRef } from "react";
import { ChatArea, Form, MentionsTextarea, SendButton, Toolbox } from "./styles";
import autosize from "autosize";

type Props = {
  chat: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder: string;
};

const ChatBox = ({ chat, onSubmitForm, onChangeChat, placeholder }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeydownChat = useCallback(
    (e) => {
      if (!e.nativeEvent.isComposing && e.key === "Enter") {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm],
  );

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <MentionsTextarea
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeydownChat}
          placeholder={placeholder}
          ref={textareaRef}
        />
        <Toolbox>
          <SendButton
            className={
              "c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send" +
              (chat?.trim() ? "" : " c-texty_input__button--disabled")
            }
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!chat?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
