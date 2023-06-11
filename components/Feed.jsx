"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const filterPosts = (text) => {
    const regex = new RegExp(text, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  useEffect(() => {
    const newPosts = filterPosts(searchText);
    setFilteredPosts(newPosts);
  }, [searchText]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPost();
  }, []);
  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for a tag or username"
          onChange={handleSearchChange}
          value={searchText}
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPosts}
        handleTagClick={(value) => {
          setSearchText(value);
        }}
      />
    </section>
  );
};

export default Feed;
