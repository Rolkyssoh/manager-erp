import {
  DefaultButton,
  PrimaryButton,
  SearchBox,
  Text,
  Spinner,
  SpinnerSize,
} from '@fluentui/react';
import { NewUserDtoIn, UserDtoIn } from '@merp/dto';
import { IUser } from '@merp/entities';
import { UserComponent } from 'apps/dashboard/src/components';
import { AddUserDialog } from 'apps/dashboard/src/dialogs';
import UserService from 'apps/dashboard/src/services/user.service';
import React, { useEffect, useState } from 'react';
import { RouteProps } from 'react-router';

export interface IUsersPageProps extends RouteProps {
  default_props?: boolean;
}

const ErrorComponent = () => (
  <Text variant="xLarge" className="company__center">
    There was an error fetching user
  </Text>
);

const EmptyComponent = () => (
  <Text variant="xLarge" className="user__center">
    There are no Users. Start by clicking on "Create Users" button above to
    create one
  </Text>
);

const LoadingComponent = () => (
  <Spinner size={SpinnerSize.large} className="company__center" />
);

export const UsersPage: React.FC<IUsersPageProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [showingDisabled, setShowingDisabled] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    await UserService.get_users()
      .then(async (response) => {
        if (response.status !== 200) {
          //@TODO #4
          // alert('error getting users');
          setError(true);
          setLoading(false);
          console.log('the error resp', response);
          return [];
        }
        return response.json();
        // const datas = (await response.json()) as UserDtoIn;
        // console.log('the user infos: ', datas.users);
        // setUsers(datas.users);
        // setLoading(false);
        // return datas;
      })
      .then((respUsers) => {
        console.log('the users datas:', respUsers);
        setUsers(respUsers);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        //@TODO #4
        console.log({ err });
        setError(true);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const searchByKeyWord = search ? filterUsers(search) : users;
    console.log('le searchByKeyWord:', searchByKeyWord);
    const byDisable = showingDisabled
      ? searchByKeyWord.filter((items) => items.disabled)
      : searchByKeyWord.filter((_) => !_.disabled);
    setFilteredUsers(byDisable);
  }, [search, showingDisabled, users]);

  const filterUsers = (searchTerm: string) => {
    return users.filter(
      (_) =>
        `${_.first_name} ${_.last_name} ${_.company?.company_name}`.indexOf(
          searchTerm
        ) !== -1
    );
  };

  const handleOnCreate = (data: NewUserDtoIn) => {
    console.log('Dans le handleOncreate :', data);
    setSearch('');
    setShowingDisabled(false);
    setUsers([data.user, ...users]);
  };

  const onDisable = (state: boolean) => {
    setShowingDisabled(state);
    console.log({ state });
    console.log('the showingDisable:', showingDisabled);
  };

  const handleDelete = ({ id }: IUser) => {
    UserService.delete_user(id)
      .then(async (response) => {
        if (response.status !== 200) {
          //TODO
          alert('Error deleting user!');
          return;
        }
        const user = (await response.json()) as IUser;
        setUsers(users.filter((_) => _.id !== user.id));
        return user;
      })
      .catch((err) => {
        //@TODO #
        console.log({ err });
      });
  };

  const handleDisable = ({ id }: IUser) => {
    UserService.disable_user(id)
      .then(async (response) => {
        if (response.status !== 200) {
          //@TODO
          alert('Error disabling user!');
          return;
        }
        const user = (await response.json()) as IUser;
        //@TODO: Success deleting user
        setUsers(users.filter((_) => _.id !== id));
        return user;
      })
      .catch((err) => {
        //@TODO
        console.log({ err });
      });
  };

  const handleEnable = ({ id }: IUser) => {
    UserService.enable_user(id)
      .then(async (response) => {
        if (response.status !== 200) {
          //@TODO
          alert('Error while enabling user!');
          return;
        }
        const user = (await response.json()) as IUser;
        //@TODO: Success deleting user
        setUsers(users.filter((_) => _.id !== id));
        return user;
      })
      .catch((err) => {
        //@TODO
        console.log({ err });
      });
  };

  return (
    <div className="users_container">
      <header className="users_page_header">
        <Text variant="xLarge">Users</Text>
        <SearchBox
          placeholder="Search"
          onEscape={(ev) => setSearch('')}
          onClear={(ev) => setSearch('')}
          onChange={(_, newValue) => setSearch(newValue || '')}
        />
      </header>
      <nav className="users__nav">
        <AddUserDialog
          onCreate={handleOnCreate}
          renderTrigger={(trigger) => (
            <PrimaryButton onClick={trigger} text="Add Sector Delegate" />
          )}
          formTitle="Delegate"
        />
        <AddUserDialog
          onCreate={handleOnCreate}
          renderTrigger={(trigger) => (
            <PrimaryButton onClick={trigger} text="Add Deliverer" />
          )}
          formTitle="Deliverer"
        />
        <DefaultButton
          text="All users"
          onClick={() => onDisable(false)}
          checked={!showingDisabled}
        />
        <DefaultButton
          text="Disabled users"
          onClick={() => onDisable(true)}
          checked={showingDisabled}
        />
      </nav>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {error ? (
            <ErrorComponent />
          ) : filteredUsers.length ? (
            <ul className="users__list">
              {filteredUsers.map(
                (_) => (
                  <UserComponent
                    user={_}
                    key={_.id}
                    onDelete={handleDelete}
                    doDisable={handleDisable}
                    doEnable={handleEnable}
                  />
                )
                // console.log({ _ })
              )}
            </ul>
          ) : (
            <EmptyComponent />
          )}
        </>
      )}
    </div>
  );
};
