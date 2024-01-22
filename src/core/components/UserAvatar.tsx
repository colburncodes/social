import { Avatar, AvatarProps } from "@mantine/core"
import { getAvatarFallbackName, getUploadThingUrl } from "~/src/utils/utils"

type Props = {
  user: {
    name?: string | null;
    avatarImageKey?: string | null;
  }
}
export const UserAvatar: React.FC<Partial<Props>> = ({ user, ...rest }) => {
  return (
    <Avatar component={"a"} src={getUploadThingUrl(user?.avatarImageKey)} radius="xl" {...rest}>
      {getAvatarFallbackName(user?.name)}
    </Avatar>
  );
};