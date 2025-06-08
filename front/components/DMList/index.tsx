import { CollapseButton } from "@components/DMList/styles";
import { useMember } from "@hooks/useMember";
import useUser from "@hooks/useUser";
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const DMList = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const { user } = useUser();
  const { memberData } = useMember(user, workspace!);
  const [channelCollapse, setChannelCollapse] = useState(false);
  // const [socket] = useSocket(workspace);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!channelCollapse &&
          memberData?.map((member) => {
            // const isOnline = onlineList.includes(member.id);
            return (
              <NavLink key={member.id} to={`workspace/${workspace}/dm/${member.id}`}>
                <span>{member.nickname}</span>
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default DMList;
