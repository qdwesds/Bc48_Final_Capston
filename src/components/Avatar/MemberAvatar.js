import { Avatar } from 'antd';
import React from 'react'

const MemberAvatar = ({members}) => {
    const renderAvatar = () => {
        if (members && members.length > 0) {
            return members.map((member, index) => <Avatar src={member.avatar} key={(Math.floor(Math.random() * 100) + 1).toString() + index} />);
        }
        return null;
    }
  return (
    <div>{renderAvatar()}</div>
  )
}

export default MemberAvatar