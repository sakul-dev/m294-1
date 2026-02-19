"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import { ILehrbetriebe } from "@/app/lehrbetriebe/ILehrbetriebe";
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

const lehrbetrieb_url = "http://localhost/hoffmann-295/src/backend/lehrbetrieb.php";

export default function LehrbetriebePage() {
  const router = useRouter();
  const [list, setList] = useState<ILehrbetriebe[]>([]);
  const [loading, setLoading] = useState(true);

  // Lädt alle Lehrbetriebe von der API
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll<ILehrbetriebe[]>(lehrbetrieb_url);
      setList(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateNew = () => {
    router.push("/lehrbetriebe/create");
  };

  const handleEdit = (item: ILehrbetriebe) => {
    router.push(`/lehrbetriebe/edit/${item.id_lehrbetrieb}`);
  };

  // Löscht einen Lehrbetrieb nach Bestätigung und aktualisiert die Liste
  const handleDelete = async (item: ILehrbetriebe) => {
    if (
      confirm(
        `Möchten Sie ${item.firma} wirklich löschen?`
      )
    ) {
      try {
        await apiService.delete(
          Number(item.id_lehrbetrieb),
          lehrbetrieb_url,
          "id_lehrbetrieb"
        );
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
            <CardTitle>Lehrbetrieb Management</CardTitle>
            <CardDescription>
              Verwalten Sie Lehrbetriebe
            </CardDescription>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button onClick={handleCreateNew}>
              <Plus className="mr-2 h-4 w-4" />
              Neuer Lehrbetrieb
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <DataTable
              data={list}
              columns={[
                { header: "ID", accessor: "id_lehrbetrieb" },
                { header: "Firma", accessor: "firma" },
                { header: "Ort", accessor: "ort" },
                { header: "Strasse", accessor: "strasse" },
                { header: "PLZ", accessor: "platz" },
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