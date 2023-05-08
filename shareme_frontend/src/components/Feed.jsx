import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { MasonryLayout, Spinner } from '.';
import { feedQuery, searchQuery } from '../utilities/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    } else {
      const query = feedQuery();
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="We are adding new ideas to your feed!" />
  }

  if (!pins?.length) {
    return <h2 className='text-center'>No pins available</h2>;
  }

  return (
    <div>
      {(pins && pins.length > 0) ? (<MasonryLayout pins={pins} />) : null}
    </div>
  );
};

export default Feed;
