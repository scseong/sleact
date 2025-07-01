import { useCallback, useEffect, useState } from "react";
import { useParams, Navigate, NavLink } from "react-router-dom";
import useUser from "@hooks/useUser";
import { useMember } from "@hooks/useMember";
import { CollapseButton } from "@components/DMList/styles";
import useSocket from "@hooks/useSocket";

const DMList = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const { user } = useUser();
  const { memberData } = useMember(user, workspace!);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [socket, disconnet] = useSocket(workspace);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  useEffect(() => {
    socket?.on("onlineList", (data: number[]) => {
      setOnlineList(data);
    });

    return () => {
      socket?.off("onlineList");
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

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
            const isOnline = onlineList.find((v) => v === member.id);
            return (
              <NavLink
                key={member.id}
                to={`/workspace/${workspace}/dm/${member.id}`}
                className={({ isActive }) => (isActive ? "selected" : "")}
              >
                <i
                  className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
                    isOnline
                      ? "c-presence--active c-icon--presence-online"
                      : "c-icon--presence-offline"
                  }`}
                  aria-hidden="true"
                  data-qa="presence_indicator"
                  data-qa-presence-self="false"
                  data-qa-presence-active="false"
                  data-qa-presence-dnd="false"
                />
                <span>{member.nickname}</span>
                {member.id === user?.id && <span> (나)</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default DMList;
