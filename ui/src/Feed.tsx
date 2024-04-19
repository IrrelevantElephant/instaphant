import { useEffect, useState } from "react";

type Post = {
  id: string;
  user: string;
  description: string;
  image: string;
};

const Feed = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/posts");
      if (!data.ok) {
        return;
      }
      const json = await data.json();
      console.log({ json });
      setPosts(json.posts);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.user}</h3>
          <img src={post.image} alt={post.description} />
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
