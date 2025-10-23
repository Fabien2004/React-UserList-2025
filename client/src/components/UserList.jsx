import { useEffect, useState } from "react";
import userService from "../services/userService";
import UserCreate from "./UserCreate";
import UserDelete from "./UserDelete";
import UserInfo from "./UserInfo";
import UserListItem from "./UserListItem";
import Search from "./Search";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [userIdInfo, setUserIdInfo] = useState(null);
  const [userDelete, setUserDelete] = useState(null);
  const [userEdit, setUserEdit] = useState(null);

  // Fetch all users once
  useEffect(() => {
    userService.getAll().then((result) => {
      setUsers(result);
      setFilteredUsers(result);
    });
  }, []);

  // Local search/filter handler
  const handleSearch = (text, criteria) => {
    if (!text || !criteria) {
      setFilteredUsers(users);
      return;
    }

    const lower = text.toLowerCase();

    const filtered = users.filter((user) =>
      user[criteria]?.toLowerCase().includes(lower)
    );

    setFilteredUsers(filtered);
  };

  // CRUD handlers (same as before)
  const createClickHandler = () => setShowCreateUser(true);
  const closeClickHandler = () => {
    setShowCreateUser(false);
    setUserEdit(null);
  };

  const saveCreateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.parentElement.parentElement);
    const userData = Object.fromEntries(formData);
    const newUser = await userService.create(userData);

    setUsers((prev) => [...prev, newUser]);
    setFilteredUsers((prev) => [...prev, newUser]);
    setShowCreateUser(false);
  };

  const infoClickHandler = (userId) => setUserIdInfo(userId);
  const infoClickCloseHandler = () => setUserIdInfo(null);

  const userDeleteClickHandler = (userId) => setUserDelete(userId);
  const userDeleteCloseHandler = () => setUserDelete(null);

  const userDeleteHandler = async () => {
    await userService.delete(userDelete);
    setUsers((state) => state.filter((u) => u._id !== userDelete));
    setFilteredUsers((state) => state.filter((u) => u._id !== userDelete));
    setUserDelete(null);
  };

  const userEditClickHandler = (userId) => setUserEdit(userId);
  const saveEditedUserHandler = async (e) => {
    const userId = userEdit;
    e.preventDefault();
    const formData = new FormData(e.target.parentElement.parentElement);
    const userData = Object.fromEntries(formData);
    const updatedUser = await userService.update(userId, userData);

    setUsers((state) =>
      state.map((user) => (user._id === userId ? updatedUser : user))
    );
    setFilteredUsers((state) =>
      state.map((user) => (user._id === userId ? updatedUser : user))
    );
    setUserEdit(null);
  };

  return (
    <section className="card users-container">
      {/*  SEARCH BAR */}
      <Search onSearch={handleSearch} />

      {/*  Create, Info, Delete, Edit modals */}
      {showCreateUser && (
        <UserCreate onClose={closeClickHandler} onSave={saveCreateHandler} />
      )}
      {userIdInfo && (
        <UserInfo userId={userIdInfo} onClose={infoClickCloseHandler} />
      )}
      {userDelete && (
        <UserDelete
          onClose={userDeleteCloseHandler}
          onDelete={userDeleteHandler}
        />
      )}
      {userEdit && (
        <UserCreate
          userId={userEdit}
          onClose={closeClickHandler}
          onEdit={saveEditedUserHandler}
        />
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserListItem
                  key={user._id}
                  onInfoClick={infoClickHandler}
                  onDeleteClick={userDeleteClickHandler}
                  onEditClick={userEditClickHandler}
                  {...user}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Sorry, we couldn't find what you're looking for.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="btn-add btn" onClick={createClickHandler}>
        Add new user
      </button>
    </section>
  );
}