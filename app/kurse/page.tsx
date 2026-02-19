"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import { IKurs } from "@/app/kurse/IKurs";
import DataTable from "@/app/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Home } from "lucide-react";

// Assuming your backend follows the same naming convention
const kurs_url = "http://localhost/hoffmann-295/src/backend/kurs.php";

export default function KursPage() {
  const router = useRouter();
  const [list, setList] = useState<IKurs[]>([]);
  const [loading, setLoading] = useState(true);

  // Lädt alle Kurse von der API
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll<IKurs[]>(kurs_url);
      setList(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (item: IKurs) => {
    router.push(`/kurse/edit/${item.id_kurs}`);
  };

  // Löscht einen Kurs nach Bestätigung und aktualisiert die Liste
  const handleDelete = async (item: IKurs) => {
    if (confirm(`Möchten Sie den Kurs "${item.kursThema}" wirklich löschen?`)) {
      try {
        await apiService.delete(Number(item.id_kurs), kurs_url, "id_kurs");
        await loadData();
      } catch {
        alert("Löschen fehlgeschlagen");
      }
    }
  };

  return (
    <main className="p-8">
      <Card className="max-w-7xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Kurs Management</CardTitle>
            <CardDescription>Verwalten Sie Kursinhalte, Dozenten und Termine</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button onClick={() => router.push("/kurse/create")}>
              <Plus className="mr-2 h-4 w-4" /> Neuer Kurs
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <DataTable
              data={list}
              columns={[
                { header: "Nr", accessor: "kursNummer" },
                { header: "Thema", accessor: "kursThema" },
                { header: "Dozent ID", accessor: "nr_dozent" },
                { header: "Start", accessor: "startdatum" },
                { header: "Ende", accessor: "enddatum" },
                { header: "Dauer (Tage)", accessor: "dauer_in_tagen" },
              ]}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}