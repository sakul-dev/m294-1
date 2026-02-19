"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiService } from "@/services/api";
import { IKurs } from "@/app/kurse/IKurs"; // Adjust import path
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const kurs_url = "http://localhost/hoffmann-295/src/backend/kurse.php";

export default function KursEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState<Partial<IKurs>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadKurs = async () => {
      const response = await fetch(`${kurs_url}?id_kurs=${id}`);
      const data = await response.json();
      setFormData(Array.isArray(data) ? data[0] : data);
    };
    loadKurs();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiService.update(formData as IKurs, kurs_url);
      router.push("/kurse");
    } catch {
      alert("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader><CardTitle>Kurs bearbeiten</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kurs-Nummer</Label>
                <Input name="kursNummer" value={formData.kursNummer || ""} onChange={(e) => setFormData({...formData, kursNummer: e.target.value})} maxLength={3} />
              </div>
              <div className="space-y-2">
                <Label>Thema</Label>
                <Input name="kursThema" value={formData.kursThema || ""} onChange={(e) => setFormData({...formData, kursThema: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Inhalt</Label>
              <Textarea value={formData.kursInhalt || ""} onChange={(e) => setFormData({...formData, kursInhalt: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Startdatum</Label>
                <Input type="date" value={formData.startdatum || ""} onChange={(e) => setFormData({...formData, startdatum: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Enddatum</Label>
                <Input type="date" value={formData.enddatum || ""} onChange={(e) => setFormData({...formData, enddatum: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/kurse")}>Abbrechen</Button>
              <Button type="submit" disabled={saving}>Speichern</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}