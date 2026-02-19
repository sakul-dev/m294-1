"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Home } from "lucide-react";

const dozenten_url = 'http://localhost/hoffmann-295/src/backend/dozenten.php';

export default function CountryCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<IDozent>>({
    vorname : "",
    nachname : "",
    strasse : "",
    platz : "",
    ort : "",
    nr_country : "",
    gender : "",
    telefon : "",
    email : "",
    birthdate : ""
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Speichert den neuen Dozenten über die API und navigiert zurück zur Liste
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await apiService.create(formData, dozenten_url);
      router.push("/dozenten");
    } catch (error) {
      console.error("Save error:", error);
      alert("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Neuen Dozenten erfassen</CardTitle>
          <CardDescription>
            Erfassen Sie einen neuen Dozenten
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Vorname</Label>
              <Input
                name="vorname"
                value={formData.vorname || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Nachname</Label>
              <Input
                name="nachname"
                value={formData.nachname || ""}
                onChange={handleChange}
                required
              />
            </div>
              <div className="space-y-2">
              <Label>Strasse</Label>
              <Input
                name="strasse"
                value={formData.strasse || ""}
                onChange={handleChange}
                required
              />
            </div>
              <div className="space-y-2">
              <Label>Platz</Label>
              <Input
                name="platz"
                value={formData.platz || ""}
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
              <div className="space-y-2">
              <Label>Land</Label>
              <Input
                name="nr_country"
                value={formData.nr_country || ""}
                onChange={handleChange}
                required
              />
            </div>
              <div className="space-y-2">
              <Label>Geschlecht</Label>
              <Input
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input
                name="telefon"
                value={formData.telefon || ""}
                onChange={handleChange}
                required
              />
            </div>
              <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
              <div className="space-y-2">
              <Label>Geburtsdatum</Label>
              <Input
                name="birthdate"
                value={formData.birthdate || ""}
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
                onClick={() => router.push("/dozenten")}
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