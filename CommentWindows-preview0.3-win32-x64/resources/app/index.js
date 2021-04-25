"use strict";

const electron = require("electron");
// const { ipcMain } = require('electron');
const ipcMain = require('electron').ipcMain
const ipcRenderer = require('electron').ipcRenderer
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
const child_process = require('child_process')


app.on("ready",function(){
    mainWindow = new BrowserWindow({width: 800, heigt: 600,webPreferences:{nodeIntegration: true,contextIsolation: false,}});
    mainWindow.loadURL("file://" + __dirname + "/html/config/main.html");
    // mainWindow.loadURL("file://" + "D:\workspace\cluster_comment_log\html\Debug_matchAll\main.html");
    mainWindow.on("closed", function() {
        mainWindow = null;
    });



    ipcMain.on('start-message', (event, arg) => {
        mainWindow.webContents.send("get-comment", "ping");

    });
    mainWindow.on('close', () => console.log('BrowserWindow.close'));
    mainWindow.on('closed', () => console.log('BrowserWindow.closed'));
});

