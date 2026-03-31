from google.colab import files
uploaded = files.upload()

import pandas as pd

df = pd.read_csv("datos_rendimiento_universidad.csv")
df.head()

# =========================
# 1️⃣ Materias con mayor índice de reprobación
# =========================

def materias_mayor_reprobacion(df):
    print("\n📌 MATERIAS CON MAYOR ÍNDICE DE REPROBACIÓN\n")

    reprobados = df[df["calificacion"] < 7]  # Ajusta si tu escala es 0-10

    total = df.groupby("materia").size()
    reprob = reprobados.groupby("materia").size()

    indice = (reprob / total).reindex(total.index, fill_value=0)
    indice = indice.sort_values(ascending=False)

    for materia, valor in indice.items():
        print(f"{materia:<20} → {valor*100:.2f}% de reprobación")


# =========================
# 2️⃣ Carreras con mayor promedio
# =========================

def carreras_mayor_promedio(df):
    print("\n📊 PROMEDIO POR CARRERA\n")

    promedio = df.groupby("carrera")["calificacion"].mean().sort_values(ascending=False)

    for carrera, valor in promedio.items():
        print(f"{carrera:<30} → {valor:.2f}")


# =========================
# 3️⃣ Moda por semestre
# =========================

def moda_por_semestre(df):
    print("\n📈 MODA DE CALIFICACIONES POR SEMESTRE\n")

    moda = df.groupby("semestre")["calificacion"].agg(
        lambda x: x.mode().iloc[0] if not x.mode().empty else None
    )

    for semestre, valor in moda.items():
        print(f"Semestre {int(semestre)} → Moda: {valor:.2f}")


# =========================
# 4️⃣ Carrera alto y bajo promedio
# =========================

def carrera_alto_bajo(df):
    print("\n🏆 CARRERA CON MEJOR Y PEOR PROMEDIO\n")

    promedio = df.groupby("carrera")["calificacion"].mean()

    mejor = promedio.idxmax()
    peor = promedio.idxmin()

    print(f"Mayor promedio  → {mejor} ({promedio.max():.2f})")
    print(f"Menor promedio  → {peor} ({promedio.min():.2f})")


# =========================
# 5️⃣ Semestres críticos por carrera
# =========================

def semestres_por_carrera(df):
    print("\n📅 SEMESTRES MÁS Y MENOS CRÍTICOS POR CARRERA\n")

    promedio = df.groupby(["carrera", "año", "semestre"])["calificacion"].mean()

    for carrera, datos in promedio.groupby(level=0):
        datos = datos.droplevel(0)

        mayor = datos.idxmax()
        menor = datos.idxmin()

        print(f"\n🎓 {carrera}")
        print(f"   Mejor periodo → Año {int(mayor[0])}, Semestre {int(mayor[1])} ({datos.max():.2f})")
        print(f"   Peor periodo  → Año {int(menor[0])}, Semestre {int(menor[1])} ({datos.min():.2f})")


# =========================
# 6️⃣ Riesgos académicos
# =========================

def riesgos_academicos(df):
    print("\n🚨 ANÁLISIS DE RIESGOS ACADÉMICOS\n")

    # Materias críticas
    reprobados = df[df["calificacion"] < 7]
    total = df.groupby("materia").size()
    reprob = reprobados.groupby("materia").size()
    indice = (reprob / total).reindex(total.index, fill_value=0)

    materias_criticas = indice[indice > 0.4]

    print("🔴 Materias con alto índice de reprobación (>40%)")
    for materia, valor in materias_criticas.items():
        print(f"   {materia} → {valor*100:.2f}%")


    # Carreras bajo promedio
    promedio_carreras = df.groupby("carrera")["calificacion"].mean()
    carreras_bajo = promedio_carreras[promedio_carreras < 7.5]

    print("\n🔴 Carreras con bajo promedio general (<7.5)")
    for carrera, valor in carreras_bajo.items():
        print(f"   {carrera} → {valor:.2f}")


    # Semestre más crítico
    promedio_sem = df.groupby(["año", "semestre"])["calificacion"].mean()
    critico = promedio_sem.idxmin()

    print("\n🔴 Semestre más crítico a nivel general")
    print(f"   Año {int(critico[0])}, Semestre {int(critico[1])} ({promedio_sem.min():.2f})")


    # Tendencia
    print("\n📉 Tendencia por carrera")

    for carrera in df["carrera"].unique():
        datos = df[df["carrera"] == carrera]
        promedio_anual = datos.groupby("año")["calificacion"].mean().sort_index()

        if len(promedio_anual) > 1:
            if promedio_anual.is_monotonic_decreasing:
                estado = "Tendencia negativa continua"
            elif promedio_anual.iloc[-1] < promedio_anual.mean():
                estado = "Posible tendencia negativa"
            else:
                estado = "Estable/Positiva"
        else:
            estado = "Datos insuficientes"

        print(f"   {carrera:<30} → {estado}")



        def menu():
    while True:
        print("\n========= MENÚ =========")
        print("1. Materias con mayor índice de reprobación")
        print("2. Carreras con mayor promedio")
        print("3. Moda por semestre")
        print("4. Carrera alto y bajo promedio")
        print("5. Semestres críticos por carrera")
        print("6. Riesgos académicos")
        print("7. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            print(materias_mayor_reprobacion(df))
        elif opcion == "2":
            print(carreras_mayor_promedio(df))
        elif opcion == "3":
            print(moda_por_semestre(df))
        elif opcion == "4":
            print(carrera_alto_bajo(df))
        elif opcion == "5":
            print(semestres_por_carrera(df))
        elif opcion == "6":
            print(riesgos_academicos(df))
        elif opcion == "7":
            break
        else:
            print("Opción inválida")

menu()