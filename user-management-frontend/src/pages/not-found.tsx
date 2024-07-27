export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-2 text-center">
      <img
        className="h-16 w-auto sm:h-20 transition-all hover:scale-110 mb-4"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
      />

      <h3 className="text-7xl font-bold">404</h3>
      <h1 className="text-xl font-medium">
        <b>😕 Desculpe!</b> Essa página não foi encontrada!
      </h1>

      <p className="text-sm">Tente novamente mais tarde!</p>

      <a
        className="text-sm font-medium text-indigo-500 hover:underline"
        href="/"
      >
        Ir para o início
      </a>
    </div>
  );
}
