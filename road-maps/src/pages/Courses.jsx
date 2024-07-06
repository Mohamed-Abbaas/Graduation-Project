import { useEffect, useState } from "react";
import Course from "../components/Course";
import Header from "../components/Header";
import Loader from "../components/Loader";
import "./courses.css";
import { getTracks } from "../services/tracksApi";
import { useLoaderData, useNavigation } from "react-router-dom";
function Courses() {
  const courses = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const colors = [
    "#f44036",
    "#800000",
    "#03a9f4",
    "#39CCCC",
    "#009688",
    "#AAAAAA",
    "#556B2F",
    "#4B0082",
  ];
  console.log(courses.tracks);
  const descriptionArr = [
    "Good Course For Front-End Fundementals will take you from the basics until mastering the track",
    "Good Course For AI Fundementals will take you from the basics until mastering the track",
    "Good Course For Back-End Fundementals will take you from the basics until mastering the track",
    "Good Course For Cyber Security Fundementals will take you from the basics until mastering the track",
    "Good Course For mobile Fundementals will take you from the basics until mastering the track",
    "Good Course For DevOps  will take you from the basics until mastering the track and becoming a professional",
    "Good Course For Computer Science Fundementals will take you from the basics until mastering the track",
    "Good Course For Programming Fundementals will take you from the basics until mastering the track",
  ];
  return (
    <div className="courses">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="container courses">
            {courses.tracks.map((course, index) => (
              <Course
                src={course.photo}
                title={course.slug}
                slug={course.slug}
                description={descriptionArr[index]}
                mainColor={colors[index]}
                key={course._id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export async function loader() {
  const courses = await getTracks();
  return courses;
}
export default Courses;
