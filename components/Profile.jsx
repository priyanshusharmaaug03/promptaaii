import Image from "next/image";
import PromptCard from "./PromptCard";
const Profile = ({ name, image, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <div className="flex justify-around items-center flex-col">
        <div>
          {image && (
            <Image
              src={image}
              alt="user image"
              width={120}
              height={120}
              className="rounded-full object-contain lazy"
            />
          )}
        </div>
        <div>
          <h1 className="text-left text-center text-4xl ">
            <span className="blue_gradient">{name}</span>
          </h1>
          <p className="desc text-left text-center">{desc}</p>
        </div>
      </div>
      <div className="mt-10 prompt_layout flex justify-center items-center flex-wrap">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
