"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import { Home } from "lucide-react";

const lehrbetriebe_url = "http://localhost/hoffmann-295/src/backend/lehrbetrieb.php";

export default function LehrbetriebeCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<ILehrbetriebe>>({
    firma: "",
    strasse: "",
    platz: "",
    ort: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Speichert den neuen Lehrbetrieb über die API und navigiert zurück zur Liste
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await apiService.create(formData, lehrbetriebe_url);
      router.push("/lehrbetriebe");
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
          <CardTitle>Neuen Lehrbetriebe erfassen</CardTitle>
          <CardDescription>
            Erfassen Sie einen neuen Lehrbetriebe mit allen Details
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