"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import { IKurs } from "@/app/kurse/IKurs";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ILernende } from "@/app/lernende/ILernende";

const BASE_URL = "http://127.0.0.1/hoffmann-295/src/backend";

// Safely extract an array from any API response shape
function extractArray(data: unknown): any[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    for (const key of ["data", "items", "lernende", "dozenten", "result", "records"]) {
      const val = (data as Record<string, unknown>)[key];
      if (Array.isArray(val)) return val;
    }
  }
  return [];
}

export default function KursEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [kurs, setKurs] = useState<Partial<IKurs>>({});
  const [participants, setParticipants] = useState<any[]>([]);
  const [allStudents, setAllStudents] = useState<ILernende[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [defaultGrade, setDefaultGrade] = useState("5.0");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Kursdetails laden
      const kursRes = await fetch(`${BASE_URL}/kurs.php?id_kurs=${id}`);
      if (!kursRes.ok) throw new Error(`kurs.php returned ${kursRes.status}`);
      const kursData = await kursRes.json();
      const kursArray = extractArray(kursData);
      setKurs(kursArray.length > 0 ? kursArray[0] : kursData);

      // 2. Aktuelle Teilnehmer laden
      const partRes = await fetch(`${BASE_URL}/kurse_lernende.php?nr_kurs=${id}`);
      if (!partRes.ok) throw new Error(`kurse_lernende.php returned ${partRes.status}`);
      const partData = await partRes.json();
      setParticipants(extractArray(partData));

      // 3. Alle verfügbaren Lernenden laden (?all triggers getAll() in CrudProvider)
      const studRes = await fetch(`${BASE_URL}/lernende.php?all`);
      if (!studRes.ok) throw new Error(`lernende.php returned ${studRes.status}`);
      const studData = await studRes.json();
      setAllStudents(extractArray(studData) as ILernende[]);

    } catch (err: any) {
      console.error("Fehler beim Laden:", err);
      setError(err?.message ?? "Unbekannter Fehler");
      setParticipants([]);
      setAllStudents([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadData();
  }, [id, loadData]);

  const toggleStudent = (studentId: string) => {
    setSelectedIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((sid) => sid !== studentId)
        : [...prev, studentId]
    );
  };

  const handleBulkAdd = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(
        selectedIds.map((sId) =>
          apiService.create(
            { nr_kurs: id, nr_lernende: sId, note: defaultGrade },
            `${BASE_URL}/kurse_lernende.php`
          )
        )
      );
      setIsModalOpen(false);
      setSelectedIds([]);
      await loadData();
    } catch {
      alert("Fehler bei der Zuweisung. Prüfen Sie die Datenbankverbindung.");
    }
  };

  const handleRemoveParticipant = async (nrLernende: string) => {
    try {
      await fetch(
        `${BASE_URL}/kurse_lernende.php?nr_kurs=${id}&nr_lernende=${nrLernende}`,
        { method: "DELETE" }
      );
      await loadData();
    } catch {
      alert("Fehler beim Austragen. Prüfen Sie die Datenbankverbindung.");
    }
  };

  const getStudentName = (nrLernende: string | number): string => {
    const s = allStudents.find(
      (student) => String(student.id_lernende) === String(nrLernende)
    );
    return s ? `${s.vorname} ${s.nachname}` : `Lernender #${nrLernende}`;
  };

  if (loading) return <div className="p-8 text-center">Laden...</div>;

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kurs verwalten</h1>
        <Button variant="outline" onClick={() => router.push("/kurse")}>
          Zurück
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive text-destructive px-4 py-3 text-sm">
          <strong>Fehler beim Laden:</strong> {error}
          <Button
            variant="link"
            size="sm"
            className="ml-2 text-destructive underline"
            onClick={loadData}
          >
            Erneut versuchen
          </Button>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Kurs-Stammdaten</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Thema</Label>
            <Input value={kurs.kursThema || ""} readOnly className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label>Kurs-Nummer</Label>
            <Input value={kurs.kursNummer || ""} readOnly className="bg-muted" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Teilnehmer & Noten</CardTitle>
            <CardDescription>Lernende diesem Kurs zuweisen</CardDescription>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>Teilnehmer hinzufügen (Multi)</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Lernende auswählen</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Standard-Note für alle neuen</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={defaultGrade}
                    onChange={(e) => setDefaultGrade(e.target.value)}
                  />
                </div>

                <Label>Verfügbare Lernende</Label>
                <ScrollArea className="h-72 border rounded-md p-4">
                  {allStudents.length > 0 ? (
                    allStudents.map((s) => {
                      const sid = String(s.id_lernende);
                      const alreadyMember = participants.some(
                        (p) => String(p.nr_lernende) === sid
                      );
                      return (
                        <div
                          key={sid}
                          className="flex items-center space-x-2 py-2 border-b last:border-0"
                        >
                          <Checkbox
                            id={`student-${sid}`}
                            disabled={alreadyMember}
                            checked={selectedIds.includes(sid)}
                            onCheckedChange={() => toggleStudent(sid)}
                          />
                          <label
                            htmlFor={`student-${sid}`}
                            className={`text-sm font-medium leading-none ${
                              alreadyMember
                                ? "text-muted-foreground line-through"
                                : "cursor-pointer"
                            }`}
                          >
                            {s.vorname} {s.nachname}{" "}
                            {alreadyMember && "(Eingeschrieben)"}
                          </label>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-sm text-center py-4 space-y-1">
                      <p className="text-muted-foreground">Keine Lernenden gefunden.</p>
                      <p className="text-xs text-muted-foreground">
                        Prüfen Sie die Konsole (F12) auf Fehler.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </div>

              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedIds([]);
                  }}
                >
                  Abbrechen
                </Button>
                <Button onClick={handleBulkAdd} disabled={selectedIds.length === 0}>
                  Hinzufügen ({selectedIds.length})
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="text-right">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.length > 0 ? (
                participants.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>{getStudentName(p.nr_lernende)}</TableCell>
                    <TableCell className="font-bold">{p.note}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleRemoveParticipant(String(p.nr_lernende))}
                      >
                        Austragen
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Noch keine Teilnehmer für diesen Kurs registriert.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}