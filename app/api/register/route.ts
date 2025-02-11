import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto'; // Generate UUID untuk id pengguna

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Validasi input
        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Semua field harus diisi!' }, { status: 400 });
        }

        // Cek apakah email sudah terdaftar
        const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;
        if ((existingUser.rowCount ?? 0) > 0) {
            return NextResponse.json({ message: 'Email sudah digunakan!' }, { status: 409 });
        }

        // Hash password sebelum disimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = randomUUID(); // Buat UUID baru

        // Simpan user ke database
        await sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${userId}, ${name}, ${email}, ${hashedPassword});
        `;

        return NextResponse.json({ message: 'Registrasi berhasil!' }, { status: 201 });
    } catch (error) {
        console.error('Error saat registrasi:', error);
        return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
    }
}
