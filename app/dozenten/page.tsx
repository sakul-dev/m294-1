"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import { IDozent } from "@/app/dozenten/IDozent";
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

const dozent_url = "http://localhost/hoffmann-295/src/backend/dozenten.php";

export default function DozentenPage() {
  const router = useRouter();
  const [list, setList] = useState<IDozent[]>([]);
  const [loading, setLoading] = useState(true);

  // Lädt alle Dozenten von der API
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll<IDozent[]>(dozent_url);
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
    router.push("/dozenten/create");
  };

  const handleEdit = (item: IDozent) => {
    router.push(`/dozenten/edit/${item.id_dozent}`);
  };

  // Lösht einen Dozenten nach Bestötigung und aktualisiert die Liste
  const handleDelete = async (item: IDozent) => {
    if (
      confirm(
        `Möchten Sie ${item.vorname} ${item.nachname} wirklich löschen?`
      )
    ) {
      try {
        await apiService.delete(
          Number(item.id_dozent),
          dozent_url,
          "id_dozent"
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
            <CardTitle>Dozenten Management</CardTitle>
            <CardDescription>
              Verwalten Sie Dozenten, Kontaktdaten und Stammdaten
            </CardDescription>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button onClick={handleCreateNew}>
              <Plus className="mr-2 h-4 w-4" />
              Neuer Dozent
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
                { header: "ID", accessor: "id_dozent" },
                { header: "Vorname", accessor: "vorname" },
                { header: "Nachname", accessor: "nachname" },
                { header: "Email", accessor: "email" },
                { header: "Ort", accessor: "ort" },
                { header: "Platz", accessor: "platz" },
                { header: "Strasse", accessor: "strasse" },
                { header: "Land", accessor: "nr_country" },
                { header: "Geschlecht", accessor: "gender" },
                { header: "Telefon", accessor: "telefon" },
                { header: "Geburtsdatum", accessor: "birthdate" },
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