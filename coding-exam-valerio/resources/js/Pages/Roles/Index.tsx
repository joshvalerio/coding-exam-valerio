import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

type Role = { id: number; name: string; description?: string };

export default function RolesIndex() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const fetchRoles = async () => {
        try {
            const res = await axios.get('/api/roles');
            setRoles(res.data);
        } catch (e) {
            // ignore for now
            console.error(e);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await axios.post('/api/roles', { name, description });
            setName('');
            setDescription('');
            fetchRoles();
        } catch (err: any) {
            if (err.response?.data?.errors) setErrors(err.response.data.errors);
        }
    };

const remove = async (id: number) => {
    if (!confirm('Delete this role?')) return;

    try {
        await axios.delete(`/api/roles/${id}`);
        fetchRoles(); // refresh roles list
    } catch (err) {
        console.error(err);
    }
};


    return (
        <>

        
            <Head title="Roles" />
            <div className="p-6">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Roles</h1>
                    <Link href="/admin/users" className="text-sm text-[#FF2D20]">Manage Users</Link>
                </div>

                <form onSubmit={submit} className="mb-6 max-w-md">
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Role Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Description</label>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
                    </div>
                    <button className="mt-2 bg-[#FF2D20] text-white px-4 py-2 rounded">Create Role</button>
                </form>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Name</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((r) => (
                            <tr key={r.id} className="border-b">
                                <td className="py-2">{r.id}</td>
                                <td className="py-2">{r.name}</td>
                                <td className="py-2">{r.description}</td>
                                <td className="py-2">
                                    <button onClick={() => remove(r.id)} className="text-sm text-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
