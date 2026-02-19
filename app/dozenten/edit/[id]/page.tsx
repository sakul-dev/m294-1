"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiService } from "@/services/api";
import { IDozent } from "@/app/dozenten/IDozent";

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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const dozenten_url = 'http://localhost/hoffmann-295/src/backend/dozenten.php';

export default function DozentEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<Partial<IDozent>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) loadDozent();
  }, [id]);

  const loadDozent = async () => {
    try {
      setLoading(true);
      // Fetches specific lecturer by ID
      const response = await fetch(`${dozenten_url}?id_dozent=${id}`);
      const data = await response.json();
      // Handle potential array response from PHP backend
      setFormData(Array.isArray(data) && data.length > 0 ? data[0] : data);
    } catch (error) {
      console.error("Failed to load:", error);
      alert("Fehler beim Laden des Dozenten");
      router.push("/dozenten");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await apiService.update(formData as IDozent, dozenten_url);
      router.push("/dozenten");
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
          <CardTitle>Dozent bearbeiten</CardTitle>
          <CardDescription>
            Änderungen für {formData.vorname} {formData.nachname} speichern
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vorname</Label>
                <Input name="vorname" value={formData.vorname || ""} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Nachname</Label>
                <Input name="nachname" value={formData.nachname || ""} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Strasse</Label>
              <Input name="strasse" value={formData.strasse || ""} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Platz (PLZ)</Label>
                <Input name="platz" value={formData.platz || ""} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Ort</Label>
                <Input name="ort" value={formData.ort || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" value={formData.email || ""} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Telefon</Label>
                <Input name="telefon" value={formData.telefon || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Geschlecht</Label>
                    <Input name="gender" value={formData.gender || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label>Geburtsdatum</Label>
                    <Input name="birthdate" type="date" value={formData.birthdate || ""} onChange={handleChange} />
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dozenten")}
                disabled={saving}
              >
                Abbrechen
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Speichern..." : "Änderungen übernehmen"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}