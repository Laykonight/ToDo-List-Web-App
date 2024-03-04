import React, { useEffect } from "react";
import { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { v4 as uuidv4 } from "uuid";

import { SignOutButton } from "./SignOutButton";
import { AddTaskButton } from "./AddTaskButton";
import { NormalButton } from "./NormalButton";
import { PriorityButton } from "./PriorityButton";

import { TaskCalendar } from "./TaskCalendar";
import { getMonthName, findListByPriority, sortAndCombineLists } from "./Utils";
import { DeadlineCard } from "./DeadlineCard";
//------------------------------------------------------------------------------------------
export const TaskForm = ({
  setTasks,
  mode,
  addDoc,
  tasks,
  rerenderFlag,
  user,
  setUser,
  setRerenderFlag,
  className,
}) => {
  const [taskInput, setTaskInput] = useState("");
  // const [user, setUser] = useState(null);
  const [priority, setPriority] = useState("LOW");
  const [deadline, setDeadline] = useState(null);
  const [showDeadlineCard, setShowDeadlineCard] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //------------------------------------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  //------------------------------------------------------------------------------------------
  useEffect(() => {
    setTasks([]);
    setTasks(sortAndCombineLists());
  }, [rerenderFlag]);
  //------------------------------------------------------------------------------------------
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };
  //------------------------------------------------------------------------------------------
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setTaskInput(""); // Clear the current task
      // Clear tasks from local state
      setUser(null);
      setTasks([]);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  //------------------------------------------------------------------------------------------
  const addTask = async (content, priority) => {
    // Check if the task is not an empty string
    if (content !== "") {
      try {
        // Create a reference to the user's collection in Firestore
        const userTasksRef = collection(firestore, user.uid + "_tasks");

        // Generate a unique ID for the new task
        const taskId = uuidv4();

        // Create the task object
        const newTask = {
          id: taskId,
          taskContent: content,
          priority: priority,
          deadline: deadline,
        };
        findListByPriority(newTask.priority).push(newTask);
        setRerenderFlag((prev) => !prev); // Toggle the flag to force re-render

        // Add the task with the generated ID as a new document to the collection
        await addDoc(userTasksRef, newTask);

        // Reset the deadline to null and hide the deadline card
        handleSetNoDeadline();
      } catch (error) {
        // Handle errors if any occur during the Firestore operations
        console.error("Error adding task to Firestore:", error.message);
      }
    }
  };
  //------------------------------------------------------------------------------------------
  const handleAddTask = async () => {
    if (user) {
      // Check if taskInput is empty
      if (taskInput.trim() === "") {
        // Display alert if taskInput is empty
        setShowAlert(true);
        return; // Exit function early if taskInput is empty
      } else {
        // setShowDeadlineCard(false);
        try {
          // Add task to the user's list locally
          addTask(taskInput, priority);
        } catch (error) {
          console.error("Error adding task locally:", error.message);
        }
      }
    } else {
      // User is not authenticated, handle accordingly
      console.log("User not authenticated. Handle accordingly.");
    }

    // Clear the task input
    setTaskInput("");
  };
  //------------------------------------------------------------------------------------------
  const selectLowPriority = () => {
    setPriority("LOW");
  };
  //------------------------------------------------------------------------------------------
  const selectmidPriority = () => {
    setPriority("MID");
  };
  //------------------------------------------------------------------------------------------
  const selectHighPriority = () => {
    setPriority("HIGH");
  };
  //------------------------------------------------------------------------------------------
  const handleDeadlineClick = () => {
    setDeadline({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    });
    setShowDeadlineCard(true);
  };
  //------------------------------------------------------------------------------------------
  const handleSetDeadline = () => {
    // Handle setting the deadline
    setDeadline({
      year: deadline.year,
      month: deadline.month,
      day: deadline.day,
    });
    console.log("Selected Deadline:", deadline);
    setShowDeadlineCard(false);
  };
  //------------------------------------------------------------------------------------------
  const handleSetNoDeadline = () => {
    // Handle setting no deadline
    setDeadline(null);
    setShowDeadlineCard(false);
  };
  //------------------------------------------------------------------------------------------
  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear + i).map(
      (year) => (
        <option key={year} value={year}>
          {year}
        </option>
      )
    );
  };
  //------------------------------------------------------------------------------------------
  const renderMonthOptions = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames
      .map((monthName, index) => {
        const monthValue = index + 1;
        const isPastMonth =
          currentYear === deadline.year && monthValue < currentMonth;
        return isPastMonth ? null : (
          <option key={monthValue} value={monthValue}>
            {monthName}
          </option>
        );
      })
      .filter(Boolean);
  };
  //------------------------------------------------------------------------------------------
  const renderDayOptions = () => {
    const daysInMonth = new Date(deadline.year, deadline.month, 0).getDate();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const dayValue = i + 1;
      const isPastDay =
        currentYear === deadline.year &&
        currentMonth === deadline.month &&
        dayValue < currentDay;
      return isPastDay ? null : (
        <option key={dayValue} value={dayValue}>
          {dayValue}
        </option>
      );
    }).filter(Boolean);
  };
  //------------------------------------------------------------------------------------------
  return (
    <>
      <div className={`col ${className}`}>
        <div // new task title
          className={`card-body ${mode}`}
        >
          {user ? (
            <>
              <SignOutButton //Sign Out Button
                mode={mode}
                handleSignOut={handleSignOut}
              />
              <h4 className="mb-5">Login as: {user.email}</h4>

              <h3 className="display-6 my-3 new-task">
                Enter a new task
                <svg // clipboard
                  xmlns="http://www.w3.org/2000/svg"
                  height="45"
                  fill="currentColor"
                  className="bi bi-clipboard-check ms-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
                  />
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                </svg>
              </h3>
              <div // task Input
                className="d-flex flex-row align-items-center mt-4"
              >
                <textarea
                  className={`interactive col mb-4 px-3 display-5 fs-2 rounded-4 ${mode}`}
                  style={{
                    filter: "drop-shadow(0 0 5px #b2bec3)",
                  }}
                  type="text"
                  name="todo"
                  value={taskInput}
                  placeholder="What you need to do ?"
                  onChange={(e) => {
                    setTaskInput(e.target.value);
                  }}
                ></textarea>
                {showAlert && (
                  <div
                    style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "800px", // Adjust width as needed
                      maxWidth: "100%", // Adjust max width as needed
                      padding: "20px", // Adjust padding as needed
                      zIndex: "9999", // Ensure it's on top of everything
                    }}
                  >
                    <div
                      className="alert alert-danger alert-dismissible fade show fs-3"
                      role="alert"
                    >
                      <strong>Error:</strong> You can't add a task with no
                      content.
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setShowAlert(false)}
                      ></button>
                    </div>
                  </div>
                )}
              </div>
              <div className="row justify-content-end">
                <div className="col-3 align-self-end flex-grow-1">
                  <br />
                  <AddTaskButton //Add Task Button
                    mode={mode}
                    handleAddTask={handleAddTask}
                  />
                </div>
                <div className="col-auto me-3">
                  <label className="fs-4 fw-bolder text-center">Deadline</label>
                  <br />
                  <NormalButton // Deadline Button
                    mode={mode}
                    onClickHandle={handleDeadlineClick}
                    darkColor="outline-light"
                    lightColor="outline-dark"
                    className="fs-4 my-3 px-4 fw-bolder rounded-4"
                  >
                    {deadline
                      ? `${deadline.day}-${getMonthName(deadline.month)}-${
                          deadline.year
                        }`
                      : "None"}
                  </NormalButton>
                </div>
                <div className="col-3">
                  <label className="fs-4 fw-bolder text-center">Priority</label>
                  <PriorityButton // priority Button
                    mode={mode}
                    name={priority}
                    selectLowPriority={selectLowPriority}
                    selectmidPriority={selectmidPriority}
                    selectHighPriority={selectHighPriority}
                    darkColorButton="outline-light"
                    lightColorButton="outline-dark"
                    case1="LOW"
                    case2="MID"
                    case3="HIGH"
                  />
                </div>
              </div>

              {/* Deadline Card */}
              {showDeadlineCard && (
                <DeadlineCard
                  mode={mode}
                  deadline={deadline}
                  setDeadline={setDeadline}
                  renderYearOptions={renderYearOptions}
                  renderMonthOptions={renderMonthOptions}
                  renderDayOptions={renderDayOptions}
                  handleSetDeadline={handleSetDeadline}
                  handleSetNoDeadline={handleSetNoDeadline}
                />
              )}
              <TaskCalendar // calendar
                mode={mode}
                tasks={tasks}
              />
            </>
          ) : (
            <>
              <div className="text-center">
                <h2 className="mb-4 fs-1">Get to your account</h2>
              </div>
              <div //Google Sign-in
                className="my-4 text-center"
              >
                <h3>Login with google</h3>
                <div className="my-3">
                  <NormalButton // Google button
                    mode={mode}
                    onClickHandle={handleGoogleLogin}
                    darkColor="outline-light"
                    lightColor="outline-dark"
                    className="px-3 py-2 mt-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="60"
                      height="60"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#fbc02d"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#e53935"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4caf50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1565c0"
                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </NormalButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
