"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiService } from "@/services/api";
import { ICountries } from "@/app/countries/ICountries";

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
import { Home } from "lucide-react";

const countries_url = 'http://localhost/hoffmann-295/src/backend/countries.php';

export default function CountryEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<Partial<ICountries>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) loadCountry();
  }, [id]);

  // Lädt die Länderdaten von der API basierend auf der ID
  const loadCountry = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${countries_url}?id_country=${id}`);
      const data = await response.json();
      setFormData(Array.isArray(data) && data.length > 0 ? data[0] : data);
    } catch (error) {
      console.error("Failed to load:", error);
      alert("Fehler beim Laden");
      router.push("/countries");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Speichert die Änderungen über die API und navigiert zurück zur Liste
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await apiService.update(formData as ICountries, countries_url);
      router.push("/countries");
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
          <CardContent>
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
          <CardTitle>Land bearbeiten</CardTitle>
          <CardDescription>
            Bearbeiten Sie {formData.country}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Land</Label>
              <Input
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                required
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
                onClick={() => router.push("/countries")}
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