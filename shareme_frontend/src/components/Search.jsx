import React, { useState, useEffect } from 'react';

import { MasonryLayout, Spinner } from '.';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utilities/data';

const Search = ({ searchTerm, setSearchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    } else {
      setLoading(true);
      client.fetch(feedQuery())
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading ? <Spinner message="Searching for pins..." /> : null}
      {(pins?.length !== 0) ? (<MasonryLayout pins={pins} />) : null}
      {(pins?.length === 0 && searchTerm !== '' && !loading) ? (
        <div className='mt-10 text-center text-xl'>
          No Pins Found!
        </div>
      ) : null}
    </div>
  );
};

export default Search;
