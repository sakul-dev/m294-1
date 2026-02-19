"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const countries_url = 'http://localhost/hoffmann-295/src/backend/countries.php';

export default function CountryCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<ICountries>>({
    country: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await apiService.create(formData, countries_url);
      router.push("/countries");
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
          <CardTitle>Neues Land erfassen</CardTitle>
          <CardDescription>
            Erfassen Sie ein neues Land
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
