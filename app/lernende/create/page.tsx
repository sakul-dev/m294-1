"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import { ILernende } from "@/app/lernende/ILernende";

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

const lernenden_url = "http://localhost/hoffmann-295/src/backend/lernende.php";

export default function LernendeCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<ILernende>>({
    vorname: "",
    nachname: "",
    strasse: "",
    platz: "",
    ort: "",
    gender: "M",
    telefon: "",
    email: "",
    emailPrivat: "",
    birthdate: "",
    nr_country: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await apiService.create(formData, lernenden_url);
      router.push("/lernende");
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
          <CardTitle>Neuen Lernenden erfassen</CardTitle>
          <CardDescription>
            Erfassen Sie einen neuen Lernenden mit allen Details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
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
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>E-Mail</Label>
              <Input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Private E-Mail</Label>
              <Input
                type="email"
                name="emailPrivat"
                value={formData.emailPrivat || ""}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-2">
                <Label>Strasse</Label>
                <Input
                  name="strasse"
                  value={formData.strasse || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Haus-Nr.</Label>
                <Input
                  name="platz"
                  value={formData.platz || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Wohnort</Label>
              <Input
                name="ort"
                value={formData.ort || ""}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Land-ID</Label>
                <Input
                  name="nr_country"
                  value={formData.nr_country || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Telefon</Label>
                <Input
                  name="telefon"
                  value={formData.telefon || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Geschlecht</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(v) =>
                    setFormData((p) => ({
                      ...p,
                      gender: v,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Männlich</SelectItem>
                    <SelectItem value="F">Weiblich</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Geburtsdatum</Label>
                <Input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/lernende")}
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
