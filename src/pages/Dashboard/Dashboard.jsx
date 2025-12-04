import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout/Layout";
import api from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    slabs: 0,
    orders: 0,
    leads: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [slabsRes, ordersRes, leadsRes] = await Promise.all([
        api.get("/slabs"),
        api.get("/orders"),
        api.get("/leads"),
      ]);

      setStats({
        slabs: slabsRes.data.total || slabsRes.data.data?.length || 0,
        orders: ordersRes.data.total || ordersRes.data.data?.length || 0,
        leads: leadsRes.data.total || leadsRes.data.data?.length || 0,
      });
    } catch (err) {
      console.log("Dashboard Error →", err);
    }
  };

  return (
    <Layout>
      <h1>Dashboard</h1>
      <p>Overview of slabs, orders, and leads</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <StatCard title="Total Slabs" value={stats.slabs} />
        <StatCard title="Total Orders" value={stats.orders} />
        <StatCard title="Total Leads" value={stats.leads} />
      </div>
    </Layout>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{
      width: "220px",
      padding: "25px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      textAlign: "center"
    }}>
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}
