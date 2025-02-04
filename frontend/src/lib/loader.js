import apiRequest from "./apiRequest.js";


export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res =await apiRequest("/posts?" + query);
  return res.data ;
};

export const profilePageLoader = async () => {
  const postResponse =await apiRequest("/users/profilePosts");
  const chatResponse =await apiRequest("/chats");

  return {postResponse,chatResponse};
};

