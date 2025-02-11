import { NextResponse } from "next/server";
import * as pg from "pg";
const { Pool } = pg;

// Konfigurasi PostgreSQL di Vercel
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

// Handler GET untuk mengambil data transaksi
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, customer_name, item_id, quantity, total_price, created_at FROM transaksi ORDER BY created_at DESC"
    );
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error saat mengambil transaksi:", error);
    return NextResponse.json({ message: "Gagal mengambil data transaksi" }, { status: 500 });
  }
}

// Handler POST untuk menyimpan transaksi
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Data yang diterima di API:", body);

    const { customer_name, item_id, quantity, total_price } = body;

    // Validasi input
    if (!customer_name || !item_id || !quantity || !total_price) {
      return NextResponse.json({ message: "Semua field harus diisi!" }, { status: 400 });
    }

    // Query untuk menyimpan transaksi
    const result = await pool.query(
      "INSERT INTO transaksi (customer_name, item_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [customer_name, item_id, quantity, total_price]
    );

    return NextResponse.json({ message: "Transaksi berhasil!", data: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error saat menyimpan transaksi:", error);
    return NextResponse.json({ message: "Gagal menyimpan transaksi" }, { status: 500 });
  }
}
