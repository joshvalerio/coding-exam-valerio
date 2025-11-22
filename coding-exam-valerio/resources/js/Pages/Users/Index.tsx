import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

type Role = { id: number; name: string };
type UserItem = { id: number; name: string; email: string; role?: Role };

export default function UsersIndex() {
    const [users, setUsers] = useState<UserItem[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [roleId, setRoleId] = useState<number | ''>('');
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const fetch = async () => {
        try {
            const [u, r] = await Promise.all([axios.get('/api/users'), axios.get('/api/roles')]);
            setUsers(u.data);
            setRoles(r.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const clientValidate = () => {
        const errs: Record<string, string[]> = {};
        if (!name.trim()) errs.name = ['Name is required'];
        if (!email.trim()) errs.email = ['Email is required'];
        if (password.length < 8) errs.password = ['Password must be at least 8 characters'];
        if (password !== passwordConfirmation) errs.password_confirmation = ['Passwords do not match'];
        return errs;
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const clientErrs = clientValidate();
        if (Object.keys(clientErrs).length) return setErrors(clientErrs);

        try {
            await axios.post('/api/users', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                role_id: roleId || null,
            });
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            setRoleId('');
            fetch();
        } catch (err: any) {
            if (err.response?.data?.errors) setErrors(err.response.data.errors);
        }
    };

    const remove = async (id: number) => {
        if (!confirm('Delete this user?')) return;
        try {
            await axios.delete(`/api/users/${id}`);
            fetch();
        } catch (e) {
            console.error(e);
            const msg = e?.response?.data?.message || e?.message || 'Failed to delete user';
            alert(msg);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Users</h2>}>
            <Head title="Users" />
            <div className="p-6">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <Link href="/admin/roles" className="text-sm text-[#FF2D20]">Manage Roles</Link>
                </div>

                <form onSubmit={submit} className="mb-6 max-w-md">
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Full Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 block w-full rounded border px-3 py-2" />
                        {errors.password && <p className="text-red-600 text-sm">{errors.password[0]}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" className="mt-1 block w-full rounded border px-3 py-2" />
                        {errors.password_confirmation && <p className="text-red-600 text-sm">{errors.password_confirmation[0]}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Assign Role</label>
                        <select value={roleId} onChange={(e) => setRoleId(e.target.value ? Number(e.target.value) : '')} className="mt-1 block w-full rounded border px-3 py-2">
                            <option value="">-- none --</option>
                            {roles.map((r) => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                        {errors.role_id && <p className="text-red-600 text-sm">{errors.role_id[0]}</p>}
                    </div>
                    <button className="mt-2 bg-[#FF2D20] text-white px-4 py-2 rounded">Create User</button>
                </form>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Role</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b">
                                <td className="py-2">{u.id}</td>
                                <td className="py-2">{u.name}</td>
                                <td className="py-2">{u.email}</td>
                                <td className="py-2">{u.role?.name ?? '-'}</td>
                                <td className="py-2"><button onClick={() => remove(u.id)} className="text-sm text-red-600">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
