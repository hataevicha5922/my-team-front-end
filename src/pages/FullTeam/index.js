import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Player } from '../../components/Player';
import { Index } from '../../components/AddComment';
import { CommentsBlock } from '../../components/CommentsBlock';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamInfo } from '../../redux/slices/teams';

export const FullTeam = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { teams, status } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeamInfo(id));
  }, []);

  if (status === 'loading') {
    return <Player isLoading={isLoading} />;
  }

  return (
    <>
      <Player
        id={teams.id}
        title={teams.teamName}
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        tags={teams.city}
        isFullPlayer
      >
        <p>
          Hey there! 👋 I'm starting a new series called "Roast the Code", where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can!!
        </p>
      </Player>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
