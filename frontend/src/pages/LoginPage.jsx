export default function LoginPage() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border rounded-md"
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Senha</label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border rounded-md"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }