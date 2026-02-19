"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiService } from "@/services/api";
import { ILehrbetriebe } from "@/app/lehrbetriebe/ILehrbetriebe";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Home } from "lucide-react";

const lehrbetrieb_url = "http://localhost/hoffmann-295/src/backend/lehrbetrieb.php";

export default function LehrbetriebeEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<Partial<ILehrbetriebe>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadlehrbetrieb();
    }
  }, [id]);

  // Lädt die Lehrbetriebs-Daten von der API basierend auf der ID
  const loadlehrbetrieb = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${lehrbetrieb_url}?id_lehrbetrieb=${id}`);
      const data = await response.json();
      setFormData(Array.isArray(data) && data.length > 0 ? data[0] : data);
    } catch (error) {
      console.error("Failed to load Lehrbetriebe:", error);
      alert("Fehler beim Laden");
      router.push("/lehrbetriebe");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Speichert die Änderungen über die API und navigiert zurück zur Liste
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await apiService.update(formData as ILehrbetriebe, lehrbetrieb_url);
      router.push("/lehrbetriebe");
    } catch (error) {
      console.error("Save error:", error);
      alert("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Firma bearbeiten</CardTitle>
          <CardDescription>
            Bearbeiten Sie {formData.firma}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Firma</Label>
                <Input
                  name="firma"
                  value={formData.firma || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Ort</Label>
                <Input
                  name="ort"
                  value={formData.ort || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>PLZ</Label>
              <Input
                name="platz"
                value={formData.platz || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Strasse</Label>
              <Input
                name="strasse"
                value={formData.strasse || ""}
                onChange={handleChange}
              />
            </div>

            <Separator />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
                disabled={saving}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/lehrbetriebe")}
                disabled={saving}
              >
                Abbrechen
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Speichern..." : "Speichern"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}