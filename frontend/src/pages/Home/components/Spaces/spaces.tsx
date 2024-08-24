import React, { Suspense, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { spaces, Space } from "../../../store/store";
import { FETCH_SPACES_API } from "../../../apis/apis";

const SpaceComp = React.lazy(() => import("./space-component"));

export default function Spaces() {
  const [Spacess, setSpaces] = useRecoilState<Space[]>(spaces);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
          console.error("No token found in localStorage");
          return;
        }
        const token = JSON.parse(tokenString);

        const res = await fetch(FETCH_SPACES_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.spaces)) {
          setSpaces(data.spaces); // Ensure data.spaces is of type Space[]
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
        setError("Error fetching spaces. Please try again later.");
      }
    };

    getSpaces();
  }, [setSpaces]);

  return (
    <div className="m-10 font-bold text-2xl first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl">
      Welcome to StudySpace!
      {error ? (
        <div className="flex bg-white text-2xl font-bold justify-center text-center">
          {error}
        </div>
      ) : Spacess.length > 0 ? (
        <div className="grid grid-cols-1 justify-center md:grid-cols-3 lg:grid-cols-2">
          {Spacess.map((space) => (
            <Suspense key={space._id} fallback="Loading...">
              <SpaceComp
                space_id={space._id}
                description={space.Description}
                heading={space.Title}
                subjectName={space.Subject}
                time={`${space.FromTime.split("T")[1].split(".")[0]} to ${
                  space.ToTime.split("T")[1].split(".")[0]
                }`}
                date={space.FromTime.split("T")[0]}
                venue={space.Venue}
              />
            </Suspense>
          ))}
        </div>
      ) : (
        <div className="flex bg-white text-2xl font-bold justify-center text-center">
          There aren't any spaces yet. Be the first to create one now!
        </div>
      )}
    </div>
  );
}
