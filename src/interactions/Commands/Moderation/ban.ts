import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, escapeMarkdown } from "discord.js";
import { Interaction } from "../../base.js";

class Ban extends Interaction {
  public data = new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(o => o
      .setName("member")
      .setDescription("The member to ban")
      .setRequired(true))
    .addStringOption(o => o
      .setName("reason")
      .setDescription("Why should this member be banned?")
      .setRequired(true))
    .addBooleanOption(o => o
      .setName("joke")
      .setDescription("Is this command a joke command?")
      .setRequired(true))
    .addBooleanOption(o => o
      .setName("appeal")
      .setDescription("Send the appeal")
      .setRequired(true))
    .addNumberOption(o => o
      .setName("time")
      .setDescription("How long to ban this member?"))
    .setName("ban")
    .setDescription("Ban a member")
    .toJSON();

  public beta = false;
  public enable = true;
  
  public execute = async (interaction: ChatInputCommandInteraction) => {
    interaction.deferReply();
    const member = interaction.options.getUser("member");
    if (!member) return interaction.editReply("I need a member to ban!")

    const reason = interaction.options.getString("reason") || "";
    await interaction.guild?.bans.create(member, { reason })
    interaction.editReply(`${escapeMarkdown(member.tag)} has been banned.`)
  };
}

export default new Ban();