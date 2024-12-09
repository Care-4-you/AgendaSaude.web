import React from "react";

interface ContentOverlayProps {
  title?: string;
  content?: string[];
  listItems?: string[];
  contentTwo?: string;
}

export const ContentOverlay: React.FC<ContentOverlayProps> = ({
  title,
  content,
  listItems,
  contentTwo
}) => {
  return (
    <div className=" flex flex-col justify-start">
      <div className="bg-[#1C226B] p-4 rounded-3xl w-full mx-auto overflow-hidden">
        <h1 className="text-xl sm:text-2xl font-MuseoModerno font-medium text-white bg-[#4AA9AF] bg-opacity-70 px-4 py-2 rounded-full mb-4 max-w-max">
          {title}
        </h1>

        {content && content.length > 0 && (
          <div className="space-y-4 mb-4">
            {content.map((paragraph, index) => (
              <p
                key={index}
                className="text-white text-sm sm:text-base leading-5 sm:leading-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {listItems && listItems.length > 0 && (
          <ol className="list-decimal list-inside text-white text-sm sm:text-base leading-5 sm:leading-6 space-y-2 mb-4">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        )}

        {contentTwo && (
          <p className="text-white text-sm sm:text-base leading-5 sm:leading-6">
            {contentTwo}
          </p>
        )}
      </div>
    </div>
  );
};
