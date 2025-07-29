// dataUtils.js
const { Temporal } = require("@js-temporal/polyfill");
const path = require('path');
const configPath = path.join(__dirname, '..', 'config', 'settings.json');
const config = require(configPath);

const localeDefault = config.idioma;
const timeZoneDefault = config.hora_local;

// Pega a data/hora atual na timezone desejada
function agora(timeZone = timeZoneDefault) {
  return Temporal.Now.zonedDateTimeISO(timeZone);
}

// Formata data completa com dia da semana, mês, ano, hora e minuto (localizado)
function formatarDataCompleta(dt = agora(), locale = localeDefault, timeZone = timeZoneDefault) {
  const jsDate = new Date(dt.year, dt.month - 1, dt.day);
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timeZone,
  });
  return formatter.format(jsDate);
}

// Pega nome do mês (ex: julho)
function pegarNomeMes(dt = agora(), locale = localeDefault) {
  const jsDate = new Date(dt.year, dt.month - 1);
  const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
  return formatter.format(jsDate);
}

// Pega nome do dia da semana (ex: segunda-feira)
function pegarNomeDiaSemana(dt = agora(), locale = localeDefault) {
  const jsDate = new Date(dt.year, dt.month - 1, dt.day);
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "long" });
  return formatter.format(jsDate);
}

// Pega número da semana ISO (1..53)
function pegarNumeroSemana(dt = agora()) {
  return dt.weekOfYear;
}

// Pega hora e minuto no formato HH:mm
function pegarHoraMinuto(dt = agora()) {
  const h = dt.hour.toString().padStart(2, "0");
  const m = dt.minute.toString().padStart(2, "0");
  return `${h}:${m}`;
}

// Soma ou subtrai dias (use dias negativos para subtrair)
function somarDias(dt = agora(), dias = 0) {
  return dt.plus({ days: dias });
}

// Compara duas datas: retorna -1 se dt1 < dt2, 0 se iguais, 1 se dt1 > dt2
function compararDatas(dt1, dt2) {
  if (dt1.epochMilliseconds < dt2.epochMilliseconds) return -1;
  if (dt1.epochMilliseconds > dt2.epochMilliseconds) return 1;
  return 0;
}

// Diferença entre duas datas em dias (dt2 - dt1)
function diferencaEmDias(dt1, dt2) {
  return dt2.until(dt1).total({ unit: "days" }) * -1; // negativo pra virar positivo
}

// Formata data em ISO padrão (ex: 2025-07-28T23:59:59+02:00)
function formatarISO(dt = agora()) {
  return dt.toString();
}

// Converte uma data para outro fuso horário
function converterFusoHorario(dt = agora(), novoTimeZone = timeZoneDefault) {
  return dt.withTimeZone(novoTimeZone);
}

module.exports = {
  agora,
  formatarDataCompleta,
  pegarNomeMes,
  pegarNomeDiaSemana,
  pegarNumeroSemana,
  pegarHoraMinuto,
  somarDias,
  compararDatas,
  diferencaEmDias,
  formatarISO,
  converterFusoHorario,
};

