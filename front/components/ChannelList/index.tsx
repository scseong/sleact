import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useChannel from "@hooks/useChannel";
import useUser from "@hooks/useUser";
import { CollapseButton } from "@components/DMList/styles";
import { NavLink } from "react-router-dom";

const ChannelList = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const { user } = useUser();
  const { channelData } = useChannel(user, workspace);
  const [channelCollapse, setChannelCollapse] = useState(false);

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
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            return (
              <NavLink key={channel.name} to={`/workspace/${workspace}/channel/${channel.name}`}>
                <span># {channel.name}</span>
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
