import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import { isEmpty } from "lodash";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const TaskList = () => {
  const { tasks, fetchTasks } = useContext(TaskContext);
  const location = useLocation();
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    fetchTasks();
  }, [location]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="mt-4">
        <div className="flex flex-col h-96 p-4 bg-gray-600 rounded-md shadow-md">
          <div className="justify-end/">
            <i class="far fa-calendar-plus text-gray-50 text-xl"></i>
          </div>

          <Calendar
            className=" bg-gray-400 rounded-md"
            view="month"
            onView="month"
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
      </div>
      <div className="my-4 mt-4">
        <section className="flex-initial items-center justify-center w-full h-96 bg-gray-600 rounded-md shadow-md overflow-y-auto">
          {/* <h1>test</h1> */}

          {!isEmpty(tasks) ? (
            tasks.slice(0, 5).map((task) => (
              <Link to={`/${task.id}`} key={task.id}>
                <div className="flex items-center justify-center py-4">
                  <div className="max-w-lg w-80 rounded-lg shadow-lg p-4 bg-gray-800">
                    <h3 className="font-semibold text-lg tracking-wide text-gray-200">
                      {task.title}
                    </h3>
                    <span
                      className={`items-center justify-center px-2 py-1 mr-2 text-xs font-bold rounded-full ${
                        task.status === "done"
                          ? " text-green-100 bg-green-600"
                          : task.status === "pending"
                          ? "text-yellow-100 bg-yellow-600"
                          : "text-red-100 bg-red-600"
                      }`}
                    >
                      {task.status}
                    </span>
                    <div className="mt-2">
                      {/* <a
                        href="#"
                        className="text-blue-700  inline-flex items-center font-semibold tracking-wide"
                      > */}
                        <span className=" text-gray-200">
                          {moment(task.date).format("L")}
                        </span>
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center py-4">
              <h1 className=" text-white">No Task for today.</h1>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TaskList;
