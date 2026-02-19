// Zentral API-Service für CRUD-Operationen (Create, Read, Update, Delete) gegen das Backend
export const apiService = {
  // Holt alle Datensätze von der API
  async getAll<T>(url: string): Promise<T> {
    const res = await fetch(`${url}?all`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  },

  // Erstellt einen neuen Datensatz über POST-Request
  async create (data: any, url: string) {
    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  /**
   * Aktualisiert einen bestehenden Datensatz über PUT-Request
   * Die ID-Spalte muss im data-Objekt enthalten sein
   */
  async update (data: any, url: string) {
    const res = await fetch(`${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.error) throw new Error(result.error);
    return result;
  },

  // Löscht einen Datensatz über DELETE-Request mit ID als Query-Parameter
  delete: async (id: number, url: string, idColumn: string) => {
    const res = await fetch(`${url}?${idColumn}=${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }
};
