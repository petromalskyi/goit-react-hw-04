import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImages = async (searchQuery, page) => {
  console.log(searchQuery);
  console.log(page);
  const response = await axios.get(
    'search/photos/?client_id=X7bmSryaDQ4Zl9buwsMLINezY-hQu2EgXC4tlifkBsM',
    {
      params: {
        query: searchQuery,
        per_page: 12,
        page,
      },
    },
  );

  return response.data;
};
