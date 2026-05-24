package dev.norbiros.yetanotherminecraft;

import net.fabricmc.api.ClientModInitializer;
import net.minecraft.client.Minecraft;

public class YetAnotherMinecraftClient implements ClientModInitializer {
    @Override
    public void onInitializeClient() {
        System.out.println("Initializing Yet Another Minecraft client");
        Thread thread = new Thread(() -> {
            while (!Thread.currentThread().isInterrupted()) {
                Minecraft minecraft = Minecraft.getInstance();
                if (minecraft != null) minecraft.execute(() -> AttackTeleport.tick(minecraft));

                try {
                    Thread.sleep(50);
                } catch (InterruptedException exception) {
                    Thread.currentThread().interrupt();
                }
            }
        }, "yet-another-minecraft-attacktp");
        thread.setDaemon(true);
        thread.start();
    }
}
