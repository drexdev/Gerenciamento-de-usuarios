import { ArrowDown2, Logout } from "iconsax-react";
import { useAuth } from "../../contexts/auth-context";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Header() {
  const { user, logout } = useAuth<true>();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-boxSecondary bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 min-h-24 lg:px-8 h-full relative flex items-center justify-between ">
        <a href="/dashboard" className="flex items-center gap-4">
          <img
            className="h-10 w-auto sm:h-14 transition-all hover:scale-110"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          />

          <div>
            <h1 className="text-lg sm:text-2xl font-bold !leading-5">
              ManageUsers
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 !leading-5">
              Controle de usuários
            </p>
          </div>
        </a>

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-4 max-sm:gap-2">
            <img
              className="h-10 w-10 max-sm:h-8 max-sm:w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />

            <div className="max-sm:hidden text-left">
              <h1 className="text-lg max-lg:text-base font-semibold !leading-5">
                Olá, {user.firstName}!
              </h1>
              <p className="text-sm text-gray-500 !leading-5">{user.email}</p>
            </div>

            <ArrowDown2 size={20} />
          </MenuButton>

          <MenuItems className="absolute right-0 z-10 mt-2 w-56 rounded-lg bg-boxPrimary focus:outline-none animate-fadeIn">
            <div className="px-4 py-3 border-b border-boxSecondary text-sm text-textQuaternary leading-4 font-medium">
              <p>
                Você está logado em:{" "}
                <b className="text-textSecondary">{user.email}</b>
              </p>
            </div>

            <div className="p-2 text-sm">
              <MenuItem>
                <button
                  onClick={() => logout()}
                  className="text-textQuaternary flex items-center w-full gap-3 px-4 py-2 font-medium rounded-md hover:bg-red-400 hover:text-white transition-colors"
                >
                  <Logout size={20} />
                  <span>Sair da conta</span>
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
