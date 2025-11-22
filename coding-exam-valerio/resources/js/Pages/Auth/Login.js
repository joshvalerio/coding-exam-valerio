"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
var react_1 = require("react");
var react_2 = require("@inertiajs/react");
function Login(_a) {
    var status = _a.status, canResetPassword = _a.canResetPassword;
    var form = (0, react_2.useForm)({ email: '', password: '', remember: false });
    function submit(e) {
        e.preventDefault();
        form.post(route('login'), {
            onFinish: function () { return form.reset('password'); },
        });
    }
    return (<>
            <react_2.Head title="Login"/>

            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input id="email" name="email" type="email" autoComplete="email" required value={form.data.email} onChange={function (e) { return form.setData('email', e.target.value); }} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#FF2D20] focus:border-[#FF2D20] focus:z-10 sm:text-sm" placeholder="Email address"/>
                                {form.errors.email && (<p className="mt-2 text-sm text-red-600">{form.errors.email}</p>)}
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required value={form.data.password} onChange={function (e) { return form.setData('password', e.target.value); }} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#FF2D20] focus:border-[#FF2D20] focus:z-10 sm:text-sm" placeholder="Password"/>
                                {form.errors.password && (<p className="mt-2 text-sm text-red-600">{form.errors.password}</p>)}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" type="checkbox" name="remember" checked={form.data.remember} onChange={function (e) { return form.setData('remember', e.target.checked); }} className="h-4 w-4 text-[#FF2D20] focus:ring-[#FF2D20] border-gray-300 rounded"/>
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                {canResetPassword && (<react_2.Link href={route('password.request')} className="font-medium text-[#FF2D20] hover:text-[#ff4b3a]">
                                        Forgot your password?
                                    </react_2.Link>)}
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={form.processing} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF2D20] hover:bg-[#ff4b3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF2D20]">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>);
}
