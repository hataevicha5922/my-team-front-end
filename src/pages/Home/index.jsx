import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';

import { Player } from '../../components/Player';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { fetchPlayers, fetchPosition } from '../../redux/slices/players';

export const Home = () => {
  const dispatch = useDispatch();
  const { players, positions } = useSelector((state) => state.players);
  const isPlayersLoading = players.status === 'loading';
  const isPositionsLoading = positions.status === 'loading';

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchPosition());
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPlayersLoading ? [...Array(5)] : players.items).map(
            (obj, index) =>
              isPlayersLoading ? (
                <Player key={index} isLoading={true} />
              ) : (
                <Player
                  id={obj.id}
                  title={obj.playerName}
                  imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                  user={{
                    avatarUrl:
                      'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                    fullName: `${obj.status}`,
                  }}
                  createdAt={obj.createdAt}
                  viewsCount={150}
                  commentsCount={3}
                  tags={obj.position}
                  isEditable
                />
              )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={positions.items} isLoading={isPositionsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: '???????? ????????????',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: '?????? ???????????????? ??????????????????????',
              },
              {
                user: {
                  fullName: '???????? ????????????',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
