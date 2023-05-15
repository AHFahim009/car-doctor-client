import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context-Provider/AuthProvider";
import BookingRow from "./BookingRow";

const NewBookings = () => {
  const { user } = useContext(AuthContext);
  const [allBooking, setAllBooking] = useState([]);

  // [(res.send) => find some bookings data only user.email related from server site       ("/booking") / send jwt token form local storage => to server site ("/booking") /  process => jwt.verify(token) in  server "/bookings" ]

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("car-access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllBooking(data);
        console.log(data);
      });
  }, [url]);

  //--------

  // [ delete one data 'dynamically'  from server site "/booking" ]
  const handleDelete = (id) => {
    const proceed = confirm("are you want to delete it");
    if (proceed) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount) {
            alert("deleted successfully");

            // after deleted successfully =>  filter allBooing and set updated state
            const remaining = allBooking.filter(
              (booking) => booking._id !== id
            );
            setAllBooking(remaining);
          }
        });
    }
  };

  // [ update one data 'dynamically' and sent to server site "/bookings"  (res.send) => ]
  const handleBookingConfirm = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          const remaining = allBooking.filter((booking) => booking._id !== id);
          const updated = allBooking.find((booking) => booking._id === id);
          updated.status = "confirm";
          const newBookings = [updated, ...remaining];
          setAllBooking(newBookings);
        }
      });
  };

  return (
    <div>
      <h2 className="text-5xl">Your bookings: {allBooking.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allBooking.map((booking) => (
              <BookingRow
                key={booking._id}
                handleDelete={handleDelete}
                handleBookingConfirm={handleBookingConfirm}
                booking={booking}
              ></BookingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewBookings;
