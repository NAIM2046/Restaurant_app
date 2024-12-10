import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import useMenu from "../../useMenu/useMenu";
import useAxiosSecure from "../../useMenu/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  //console.log(menu);
  const axiosSecure = useAxiosSecure();
  const handledeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`menu/${id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <SectionTitle
        heading={"Manage All Items"}
        subHeading={"Hurray Up"}
      ></SectionTitle>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>item image</th>
                <th>item name</th>
                <th>price</th>
                <th> Update</th>
                <th> Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link to={`/dashboard/updataItem/${item._id}`}>
                      <button className="btn btn-ghost btn-lg">
                        <FaEdit></FaEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handledeleteItem(item._id);
                      }}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
