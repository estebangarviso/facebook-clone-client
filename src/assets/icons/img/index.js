import { styled } from '@mui/material/styles';
import FriendsImg from './Friends.png';

const StyledImg = styled('img')`
  filter: ${(props) => props.theme.palette.primary.icon};
`;

export const Friends = () => <StyledImg src={FriendsImg} height='12' width='12' />;
